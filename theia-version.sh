#!/bin/sh

function setTheiaVersion() {
	if [[ ! "$1" =~ 'node_modules/' ]]
	then 
		echo "Setting @theia version to $2 in $1"
		mv $1 $1.orig
		sed -e 's/\(\"\@theia[^\"]*\": \)\"[a-z]*\"/\1"'$2'"/' $1.orig > $1 
		rm -f $1.orig
	fi
} 

if [ -z "$1" ] || ([ "$1" != "next" ] && [ "$1" != "latest" ])
then
	echo Sets the version of the @theia extension dependencies in the package.json files.
	echo 
	echo Usage:
	echo sh theia-version.sh '<next|latest>'
else
	for file in `find * -name package.json -print`
	do
		setTheiaVersion $file $1
	done
fi