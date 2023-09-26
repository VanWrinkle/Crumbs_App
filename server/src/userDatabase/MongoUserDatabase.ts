import {UserDatabase} from "./UserDatabase";
import {StoredUserData} from "./StoredUserData"
import {MongoClient, ServerApiVersion} from 'mongodb';
export class MongoUserDatabase implements UserDatabase {
    #mongo_uri = "mongodb+srv://crumbdevs:crumbdevsruler@crumbdevs.ta4zcje.mongodb.net/?retryWrites=true&w=majority";
    #client: MongoClient = this.#createClient(this.#mongo_uri);
    #dbName: string = "userdata";

    #createClient(uri: string): MongoClient {
        return new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }

    async #verifySuccessfulConnection() {
        try {
            await this.#client.db(this.#dbName).command({ ping: 1 });
        } catch(error) {
            console.log("Failed to ping userDatabase <" + this.#dbName + ">: " + error);
        }
    }


    public addUser(user: StoredUserData): Promise<void> {
        return new Promise(async (resolve) => {
            try {
                await this.#client.connect();
                await this.#verifySuccessfulConnection();
                await this.#client
                    .db(this.#dbName)
                    .collection("login_info")
                    .insertOne(user);
            } catch {
                console.log("Failed to insert userdata");
            } finally {
                // Ensures that the client will close when you finish/error
                await this.#client.close();
                resolve()
            }
        });
    }


    public getUser(username: string): Promise<StoredUserData | undefined> {
        return new Promise(async (resolve) => {

            try {
                await this.#client.connect();
                await this.#verifySuccessfulConnection();

                let userData = await this.#client
                    .db(this.#dbName)
                    .collection("login_info")
                    .findOne({userName: username});

                let user: StoredUserData | undefined;
                if (userData != null &&
                    userData.userName != null &&
                    userData.hash != null &&
                    userData.salt != null) {
                    user = {
                        userName: userData.userName,
                        hash: userData.hash,
                        salt: userData.salt
                    };
                }
                resolve(user);
            } catch (error) {
                return error;
            } finally {
                await this.#client.close();
            }
        })
    }
}