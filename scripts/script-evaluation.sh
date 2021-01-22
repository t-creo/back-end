#!/bin/bash
NUM_TESTS="50 100 200 500 1000 2000"
CONCURRENCIES="5 10 20 30"
URLS="/health
/calculate/tweets/scraped?tweetText=Nothing%20can%20escape%20gravity,%20not%20even%20black%20holes%20(and%20they%20really%20tried!)&weightSpam=0.44&weightBadWords=0.33&weightMisspelling=0.23&weightText=0.34&weightUser=0.33&weightSocial=0.33&followersCount=39136685&friendsCount=97&verified=true&yearJoined=2009&maxFollowers=2000000&lang=en
/calculate/plain-text?weightBadWords=0.33&weightMisspelling=0.33&weightSpam=0.34&text=Nothing%20can%20escape%20gravity,%20not%20even%20black%20holes%20(and%20they%20really%20tried!)&lang=en
/calculate/tweets/scraped?tweetText=Oh%20look%20another%20month&weightSpam=0.44&weightBadWords=0.33&weightMisspelling=0.23&weightText=0.34&weightUser=0.33&weightSocial=0.33&followersCount=58338354&friendsCount=9&verified=true&yearJoined=2007&maxFollowers=2000000&lang=en
/calculate/plain-text?weightBadWords=0.33&weightMisspelling=0.33&weightSpam=0.34&text=Oh%20look%20another%20month&lang=en
"

REPORT_FILE="report.txt"
rm -f $REPORT_FILE
BASE_URL=http://localhost:3000

for url in $URLS
do
  echo -e "** Testing with $url **"
  echo -e "** Testing with $url **" >> $REPORT_FILE
  for num_test in $NUM_TESTS
  do
    echo -e "\t** With $num_test tests**"
    echo -e "** With $num_test tests**" >> $REPORT_FILE
    for concurrency in $CONCURRENCIES
    do
      echo -e "\t\t** With $concurrency concurrency **"
      echo -e "** With $concurrency concurrency **" >> $REPORT_FILE
      ab -v 1 -n $num_test -c $concurrency "$BASE_URL$url" 2> /dev/null | egrep "Time taken for tests|Requests per second:|Time per request: +[0-9]+\.[0-9]+.+\(mean\)" >> $REPORT_FILE
      echo ------------------------------------------ >> $REPORT_FILE
    done
  done
  echo ---------------------------------------------------------------------
done
