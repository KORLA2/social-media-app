    #!/bin/sh

    # To ensure the GraphQL docs load in the explorer, set the _APP_OPTIONS_ABUSE
    # variable to disabled in your .env file.
    # 
    # If you have a domain, run this script passing the endpoint like:
    #   ./start-appwrite-graphql-explorer.sh https://appwrite.example.com/v1
    #
    # After you see "GraphQL Explorer listening on port 3000!", open your browser
    # and browse to http://localhost:3000