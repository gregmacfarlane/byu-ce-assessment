# byu-ce-assessment
Assessment Manual for BYU Civil Engineering Program

This repository contains a Quarto book project structured with chapters and a custom style. Below are the details on how to build and render the book.

## Project Structure

- `_quarto.yml`: Configuration file for the Quarto book.
- `index.qmd`: Main entry point for the book, containing the introduction.
- `1_studentoutcomes.qmd`: where we describe performance expectations for each student outcome.
- `2_exit.qmd`: where we describe the exit survey and how it is used to assess student outcomes.
- `3_fe.qmd`: where we describe the FE exam and how it is used to assess student outcomes.
- `README.md`: Documentation for the project.

## Building the Book

To build the Quarto book, navigate to the project directory and run the following command:

```
quarto render
```

This will generate the output files in the specified format as defined in the `_quarto.yml` configuration.

## Viewing the Book

After rendering, you can view the book in your web browser by opening the generated HTML files located in the `_book` directory (if specified in your configuration).

## Additional Information

For more information on Quarto and its features, please refer to the official Quarto documentation.