# geocodexyz
A simple geocoder that accepts address data like zip codes from a csv file and spits out things like coordinates to a csv file.
One branch uses geocode.xyz api, another google geocode api.

# Helpful console scripts
## Putting all fields in double quotes
```shell script
//First do:
$ cat yourfile | sed -Ee 's#(([^,]+),)#"\2",#g' > outputfile
//then do:
$ cat outputfile | sed -Ee 's#(([^,]+)$)#"\2"#g' > secondoutputfile

//In VIM:
:%s/,\(\s\|\n\)\@!/","/
```

#To-Dos
- Doc how to use a different input file
- Doc how to use different attributes from the response
