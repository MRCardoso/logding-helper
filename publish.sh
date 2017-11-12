#!/bin/bash

git status

read -p "Publish changes? " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
    lastTag=`git describe --abbrev=0 --tags`
    ma=$(echo $lastTag | cut -d. -f 1)
    me=$(echo $lastTag | cut -d. -f 2)
    ph=$(echo $lastTag | cut -d. -f 3)

    case "$3" in
        'major')
            ma=$((++ma))
            ;;
        'mejor')
            me=$((++me))
            ;;
        *)
            ph=$((++ph))
    esac

    if [ -z $1 ] 
    then addStr="."
    else addStr=$1 
    fi

    if [ -z $2 ] 
    then commitStr="default commit, changed files"
    else commitStr=$2
    fi

    if [ -z $4 ] 
    then repositoryStr="$(git rev-parse --abbrev-ref HEAD)"
    else repositoryStr=$4
    fi

    newTag="$ma.$me.$ph"
    echo "Adding Files-------------'$addStr'"
    echo "Commit Message-----------$commitStr"
    echo "Current Tag--------------$lastTag"
    echo "Next Tag-----------------$newTag"

    read -p "Do you want publish? " -n 1 -r
    if [[ $REPLY =~ ^[Yy]$ ]]
    then    
        echo -e "\nPublishing------------------\n"
        git add "$addStr" && 
        git commit -m "$commitStr" && 
        git tag "$newTag" && 
        git push orgin $repositoryStr --tags
    else
        echo -e "\nFinish----------------------\n"
    fi
else
    echo -e "\nFinish-$repositoryStr---------------------\n"
fi