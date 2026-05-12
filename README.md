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

You can also use the npm script:

```
npm run render
```

## Building the Password-Protected Book

This project uses Staticrypt to encrypt the rendered HTML pages for static hosting. Install the Node dependencies once:

```
npm install
```

Then render and encrypt the site with a password supplied through the `STATICRYPT_PASSWORD` environment variable:

```
STATICRYPT_PASSWORD="use-a-long-password" npm run build:protected
```

Alternatively, create a local `.env` file containing `STATICRYPT_PASSWORD=use-a-long-password` and run `npm run build:protected`. The `.env` file is ignored by git.

The unencrypted Quarto output is written to `_book`, and the encrypted static site is written to `_book_protected`. Deploy the contents of `_book_protected` when the site should be password-protected.

The `.staticrypt.json` file stores the Staticrypt salt only; it does not contain the password and should remain in the repository so encrypted pages use a stable salt across builds. Do not commit real passwords. Local `.env` files are ignored.

To publish the encrypted site to GitHub Pages through Quarto, run:

```
STATICRYPT_PASSWORD="use-a-long-password" npm run publish:protected
```

This renders the normal Quarto book to `_book`, encrypts it into `_book_protected`, then runs `quarto publish gh-pages --profile protected --no-render --no-browser`. The `protected` Quarto profile points publishing at `_book_protected` without re-rendering over the encrypted files.

## Viewing the Book

After rendering, you can view the book in your web browser by opening the generated HTML files located in the `_book` directory (if specified in your configuration).

## Additional Information

For more information on Quarto and its features, please refer to the official Quarto documentation.
