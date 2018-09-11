# Moto Secure Code Review

Couple quick examples from Moto Secure Code Review

1) super-funnel-index.php file is an example of cleaning up / minimizing some PHP variables from the main index file.

2) custom.js file is a quick (not tested or functioning) example of cleaning up the duplicated ajax functionality, while sticking with existing jQuery setup, localizing PHP variables and adding scope to some variables.

3) promoCode.php file is a quick example of checking PHP Post variables before requiring more code running functions. Also broke it down into a loop function for less code that works with an array.

All examples are mainly to show better DRY (Don't repeat yourself) principals.
