# Automated Entry System Using QR codes


NITK is one of the most prestigious colleges in India and many students, faculties and often guests roam the campus. But not everyone should be allowed access to all the buildings like library, sports complex, lecture halls and other administrative buildings at all times. Entering such buildings requires filling in lengthy details every time and even this process is not very secure as anyone can enter at any time with fake identity.

We want to automate this process and to do this we use QR codes.

## QR codes:
QR stands for "Quick Response".
While they may look simple, QR codes are capable of storing lots of data. But no matter how much they contain, when scanned, the QR code should allow the user to access information instantly – hence why it’s called a Quick Response code.

## Solution:
A small display is present at the entry of the buildings which will display a QR code. The QR code will contain a randomly generated string which will be unique for each location. These strings will be stored as a mapping from location to string in the database. Using a Cron Job or any other task scheduler we  change the QR code to contain a different string after a certain time. 

Every time a user scans the QR code a request is sent to the server along with the scanned string which can be used to verify the location as well as the person.
This can help eliminate the problem of people spamming requests and is a secure method as well.

The map can look something like:

```
Library => flkasaljlajshafibbae

Sports complex => iuqgyugbhdiudrtxqsa

Main building => uwigbsduiwbuidsikhn
```

This will then be changed after a certain time( half an hour, an hour, half a day or so) to:
```
Library => srthtrdsbthrsrattduop
Sports complex => fdgjryibvcnxmoe
Main building => ruykwqfqagzayrfryk
```

Accordingly the QR codes at these locations should also change to match the new strings.

Additionally we can also implement a location on feature similar to Gpay. Users can scan the QR code only if their location is on. This will help ensure that people don't send a picture of the QR code to someone else to scan and enter the building in their name.

