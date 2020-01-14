# undergraduate-thesis

This project was part of my Undergraduate Dissertation for my Bachelor Degree in the Department of Informatics and Telecommunications, University of Athens. I used Google OR tools, Spring Boot and ReactJS to make a web application to help people visualize various well known Computer Science algorithms in the field of Operational Research. 

## Getting Started

Clone the repository to your local machine using the following command:
```
git clone https://github.com/YolandaKok/undergraduate-thesis.git
```
### Prerequisities

You have to install:
yarn, webpack, java-11, mvn, nodejs

## Build

### Build command - Front end
* yarn run local_build
### Build command - Back end
* mvn clean install -DskipTests
### Run microservice 
* java -Djava.library.path=lib -jar -Dspring.profiles.active=local target/app-0.0.1-SNAPSHOT.jar
