import AWSAppSyncClient, {AUTH_TYPE} from "aws-appsync/lib";
import awsConfig from "../aws-exports";

export class DataService {
  client: any;

  constructor() {
    this.initializeAppSyncClient();
  }

  private initializeAppSyncClient() {
    console.log('WTF')

        this.client = new AWSAppSyncClient({
            url: awsConfig.aws_appsync_graphqlEndpoint,
            region: awsConfig.aws_appsync_region,
            auth: {
                // type: aws_config.aws_appsync_authenticationType,
                type: AUTH_TYPE.API_KEY,
                apiKey: awsConfig.aws_appsync_apiKey,
                // https://aws-amplify.github.io/docs/js/api#iam-auth
                // type: AUTH_TYPE.AWS_IAM,
                // credentials: () => this._amplifyService.auth().currentCredentials(),
                // credentials: () => null,
                // for every single request, the AppSync client will await for the promise you return in
                // jwtToken function will be executed once per request and the token will be always fresh (Amplify internally handles the refresh for you)
                /*jwtToken: async () => (await Auth.currentCredentials()
                    .then((data: ICredentials) => {
                        console.log('currentcredentials');
                        console.log(data);
                        console.log(data.accessKeyId);
                        console.log(data.authenticated);
                        console.log(data.identityId);
                        console.log(data.secretAccessKey);
                        console.log(data.sessionToken);
                        // return data.getIdToken().getJwtToken();
                    })
                    .catch(err => {
                        return err;
                    })),*/

                // jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
            },
            // how to handle modifications while offline
            offlineConfig: {
                callback: (err, succ) => {
                    if (err) {
                        const {mutation} = err;

                        console.warn(`ERROR for ${mutation}`, err);
                    } else {
                        const {mutation} = succ;

                        console.log(`SUCCESS for ${mutation}`, succ);
                    }
                },
            },
            /*{
                defaultOptions: {
                    watchQuery: {
                        fetchPolicy: 'cache-and-network',
                    },
                },
            }*/
        });
    }
}

