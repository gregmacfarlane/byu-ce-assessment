library(shiny)

categories <- c(
  "Mathematics and Statistics", "Ethics and Professional Practice", 
  "Engineering Economics", "Statics", "Dynamics", "Mechanics of Materials", 
  "Materials", "Fluid Mechanics", "Surveying", "Water Resources and Environmental Engineering", 
  "Structural Engineering", "Geotechnical Engineering", "Transportation Engineering", 
  "Construction Engineering")

ui <- fluidPage(
  titlePanel("BYU Civil Engineering FE Subscores"),
    mainPanel(
      selectInput(
        inputId = "category",
        label   = "Choose a category:",
        choices = sort(unique(categories)),
        selected = "Mathematics and Statistics"
      ),
      plotOutput("distPlot", width = "600px")
    )
  
)