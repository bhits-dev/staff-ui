# Short Description
The Staff User Interface (staff-ui) is an administrative user interface used to create and manage user accounts.

# Full Description

# Supported Source Code Tags and Current `Dockerfile` Link

[`0.1.0 (latest)`](https://github.com/bhits-dev/staff-ui/releases/tag/0.1.0)

[`Current Dockerfile`](https://github.com/bhits-dev/staff-ui/blob/master/server/src/main/docker/Dockerfile)

For more information about this image, the source code, and its history, please see the [GitHub repository](https://github.com/bhits-dev/staff-ui).

# What is Staff UI?

The Staff User Interface (staff-ui) is an administrative user interface component of Consent2Share (C2S) used to create and manage user accounts. Administrative staff can use this to log in, visit their home page, create user accounts, and manage user information.

For more information and related downloads for Consent2Share, please visit [Consent2Share](https://bhits.github.io/consent2share/).

# How to use this image

## Start a staff-ui instance

Be sure to familiarize yourself with the repository's [README.md](https://github.com/bhits-dev/staff-ui) file before starting the instance.

`docker run  --name staff-ui -d bhitsdev/staff-ui:latest <additional program arguments>`

*NOTE: In order for this API to fully function as a microservice in the Consent2Share application, it is required to setup the dependency microservices and the support level infrastructure. Please refer to the Consent2Share Deployment Guide in the corresponding Consent2Share release (see [Consent2Share Releases Page](https://github.com/bhits-dev/consent2share/releases)) for instructions to setup the Consent2Share infrastructure.*

## Configure

The Spring profiles `application-default` and `docker` are activated by default when building images.

This API can run with the default configuration which is from three places: `bootstrap.yml`, `application.yml`, and the data which the [`Configuration Server`](https://github.com/bhits-dev/config-server) reads from the `Configuration Data Git Repository`. Both `bootstrap.yml` and `application.yml` files are located in the class path of the running application.

We **recommend** overriding the configuration as needed in the `Configuration Data Git Repository`, which is used by the `Configuration Server`.

Also, [Spring Boot](https://projects.spring.io/spring-boot/) supports other ways to override the default configuration to configure the API for a certain deployment environment. 

The following is an example to override the default configuration:

`docker run -d bhitsdev/staff-ui:latest --c2s.staff-ui.oauth2.client.secret=strongpassword`

## Environment Variables

When you start the Staff UI image, you can edit the configuration of the Staff UI instance by passing one or more environment variables on the command line. 

### JAR_FILE
This environment variable is used to setup which jar file will run. you need mount the jar file to the root of container.

`docker run --name staff-ui -e JAR_FILE="staff-ui-latest.jar" -v "/path/on/dockerhost/staff-ui-latest.jar:/staff-ui-latest.jar" -d bhitsdev/staff-ui:latest`

### JAVA_OPTS 
This environment variable is used to setup JVM argument, such as memory configuration.

`docker run --name staff-ui -e "JAVA_OPTS=-Xms512m -Xmx700m -Xss1m" -d bhitsdev/staff-ui:latest`

### DEFAULT_PROGRAM_ARGS 

This environment variable is used to setup an application argument. The default value of is "--spring.profiles.active=application-default, docker".

`docker run --name staff-ui -e DEFAULT_PROGRAM_ARGS="--spring.profiles.active=application-default,ssl,docker" -d bhitsdev/staff-ui:latest`

# Supported Docker versions
This image is officially supported on Docker version 1.12.1.

Support for older versions (down to 1.6) is provided on a best-effort basis.

Please see the [Docker installation documentation](https://docs.docker.com/engine/installation/) for details on how to upgrade your Docker daemon.

# License
View [license](https://github.com/bhits-dev/staff-ui/blob/master/LICENSE) information for the software contained in this image.

# User Feedback

## Documentation 
Documentation for this image is stored in the [bhitsdev/staff-ui](https://github.com/bhits-dev/staff-ui) GitHub repository. Be sure to familiarize yourself with the repository's README.md file before attempting a pull request.

## Issues

If you have any problems with or questions about this image, please contact us through a [GitHub issue](https://github.com/bhits-dev/staff-ui/issues).