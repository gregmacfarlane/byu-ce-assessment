library(shiny)
library(tidyverse)
semester_to_date <- function(semester) {
  year <- as.numeric(stringr::str_extract(semester, "[0-9]+"))
  type <- stringr::str_extract(semester, "[a-zA-Z]+")
  
  date_str <- dplyr::case_when(
    type == "Winter" ~ stringr::str_c(year, "-06-01"),
    type == "Fall"   ~ stringr::str_c(year, "-12-01"),
    TRUE             ~ NA_character_
  )
  
  lubridate::ymd(date_str)
}

pal <- c("#FF6127", "#002E5D")
fe_subs <- readr::read_csv("data.csv") |>
    mutate( period = semester_to_date(period))

server <- function(input, output) {

output$distPlot <- renderPlot({
  req(input$category)

  fe_subs |>
    dplyr::filter(category == input$category) |>
    ggplot2::ggplot(ggplot2::aes(x = period)) +
    ggplot2::geom_line(ggplot2::aes(y = institution, color = "BYU CE")) +
    ggplot2::geom_line(ggplot2::aes(y = abet, color = "ABET Comparator")) +
    ggplot2::geom_ribbon(
      ggplot2::aes(ymin = abet - abet_se, ymax = abet + abet_se, fill = "ABET SE"),
      alpha = 0.2
    ) +
    ggplot2::scale_y_continuous(limits = c(0, NA)) +
    ggplot2::scale_color_manual(
      name = NULL,
      values = c("BYU CE" = pal[2], "ABET Comparator" = pal[1])
    ) +
    ggplot2::scale_fill_manual(
      name = NULL,
      values = c("ABET SE" = pal[1])
    ) +
    ggplot2::ylab(str_c(input$category, "Subscore", sep = " " )) +
    ggplot2::xlab("Period of Examination [six months ending]") + 
    ggplot2::theme_bw() + ggplot2::theme(text = element_text(size = 14))

})
}