vl.register(vega, vegaLite, {});

async function renderChart(viewID, spec) {
  try {
    const result = await vegaEmbed(viewID, spec);
    await result.view.run();
  } catch (error) {
    console.error(`Error rendering ${viewID}:`, error);
  }
}

async function init() {
  const data = await d3.csv("./dataset/vgsales.csv");

  // Topic 1: Global Sales By Genre and Platform

  // Vis 1: Which platform sells the most action games?
  const spec1 = vl.markBar()
    .data(data)
    .transform(
      vl.filter("datum.Genre === 'Action'"),
      vl.groupby("Platform").aggregate(vl.sum("Global_Sales").as("TotalSales"))
    )
    .encode(
      vl.x().fieldN("Platform").sort("-y").title("Platform"),
      vl.y().fieldQ("TotalSales").title("Action Game Sales (Millions)"),
      vl.color().value("#e74c3c")
    )
    .width(600).height(400).toSpec();

  // Vis 2: RPG Nintendo vs PlayStation
  const spec2 = vl.markBar()
    .data(data)
    .transform(
      vl.filter("datum.Genre === 'Role-Playing'"),
      vl.calculate("indexof(['Wii', 'NES', 'GB', 'DS', 'SNES', 'GBA', '3DS', 'N64', 'GC', 'WiiU'], datum.Platform) >= 0 ? 'Nintendo' : (indexof(['PS', 'PS2', 'PS3', 'PS4', 'PSP', 'PSV'], datum.Platform) >= 0 ? 'PlayStation' : 'Other')").as("Company"),
      vl.filter("datum.Company != 'Other'"),
      vl.groupby("Company").aggregate(vl.sum("Global_Sales").as("RPG_Total"))
    )
    .encode(
      vl.x().fieldN("Company").title("Manufacturer"),
      vl.y().fieldQ("RPG_Total").title("Total RPG Sales (Millions)"),
      vl.color().fieldN("Company").scale({range: ["#e74c3c", "#2c3e50"]})
    )
    .width(600).height(400).toSpec();


  // Topic 2: Sales Over Time By Platform and Genre

  // Vis 3: Strategy Game Trend
  const spec3 = vl.markLine({point: true})
    .data(data)
    .transform(
      vl.filter("datum.Genre === 'Strategy'"),
      vl.filter("datum.Year <= 2016"),
      vl.groupby("Year").aggregate(vl.sum("Global_Sales").as("YearlySales"))
    )
    .encode(
      vl.x().fieldO("Year").title("Year"),
      vl.y().fieldQ("YearlySales").title("Global Strategy Sales"),
      vl.color().value("#e74c3c")
    )
    .width(600).height(400).toSpec();

  // Vis 4: Shooter Game Trend
  const spec4 = vl.markLine({point: true})
    .data(data)
    .transform(
      vl.filter("datum.Genre === 'Shooter'"),
      vl.filter("datum.Year <= 2016"),
      vl.groupby("Year").aggregate(vl.sum("Global_Sales").as("YearlySales"))
    )
    .encode(
      vl.x().fieldO("Year").title("Year"),
      vl.y().fieldQ("YearlySales").title("Global Shooter Sales"),
      vl.color().value("#2c3e50")
    )
    .width(600).height(400).toSpec();


  //Topic 3: Regional Sales Vs. Platform

  // Vis 5: Xbox Sales EU vs NA
  const spec5 = vl.markLine({point: true})
    .data(data)
    .transform(
      vl.filter("datum.Platform === 'XB' || datum.Platform === 'X360' || datum.Platform === 'XOne'"),
       vl.filter("datum.Year <= 2016"),
      vl.fold(["NA_Sales", "EU_Sales"]).as("Region", "SalesVal"),
      vl.groupby(["Year", "Region"]).aggregate(vl.sum("SalesVal").as("TotalRegional"))
    )
    .encode(
      vl.x().fieldO("Year").title("Year"),
      vl.y().fieldQ("TotalRegional").title("Sales (Millions)"),
      vl.color().fieldN("Region").scale({range: ["#2c3e50", "#e74c3c"]})
    )
    .width(600).height(400).toSpec();

  // Vis 6: Regional Sales For Each Console
  const spec6 = vl.markBar()
    .data(data)
    .transform(
      vl.fold(["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"]).as("Region", "SalesVal"),
      vl.groupby(["Platform", "Region"]).aggregate(vl.sum("SalesVal").as("SumSales"))
    )
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("SumSales").stack("normalize").title("Market Share %"),
      vl.color().fieldN("Region")
    )
    .width(600).height(400).toSpec();


  // Topic 4: Tell Us A Visual Story

  // Vis 7: Handheld vs Home Evolution
  const spec7 = vl.markArea()
    .data(data)
    .transform(
      vl.calculate("indexof(['GB', 'GBA', 'DS', '3DS', 'PSP', 'PSV'], datum.Platform) >= 0 ? 'Handheld' : 'Home'").as("Type"),
      vl.filter("datum.Year <= 2016"),
      vl.groupby(["Year", "Type"]).aggregate(vl.sum("Global_Sales").as("TypeTotal"))
    )
    .encode(
      vl.x().fieldO("Year").title("Year"),
      vl.y().fieldQ("TypeTotal").stack("normalize").title("Market Share %"),
      vl.color().fieldN("Type").scale({range: ["#e74c3c", "#2c3e50"]})
    )
    .width(600).height(400).toSpec();

  // Vis 8: JP vs NA Genre Preferences (Scatter Plot)
  const spec8 = vl.markCircle({size: 200})
    .data(data)
    .transform(
      vl.groupby("Genre").aggregate(
        vl.sum("NA_Sales").as("TotalNA"),
        vl.sum("JP_Sales").as("TotalJP")
      )
    )
    .encode(
      vl.x().fieldQ("TotalNA").title("Total NA Sales (Millions)"),
      vl.y().fieldQ("TotalJP").title("Total JP Sales (Millions)"),
      vl.color().fieldN("Genre"),
      vl.tooltip([
        vl.fieldN("Genre"),
        vl.fieldQ("TotalNA"),
        vl.fieldQ("TotalJP")
      ])
    )
    .width(600).height(400).toSpec();

  renderChart("#view", spec1);
  renderChart("#view2", spec2);
  renderChart("#view3", spec3);
  renderChart("#view4", spec4);
  renderChart("#view5", spec5);
  renderChart("#view6", spec6);
  renderChart("#view7", spec7);
  renderChart("#view8", spec8);
}

init();