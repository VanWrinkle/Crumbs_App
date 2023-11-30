import {ICredentialsPersistence} from "../../../../contracts/ICredentialsPersistence";
import {UserRegistration} from "../../../../entities/UserRegistration"
import {MongoClient, ServerApiVersion} from 'mongodb';
export class MDBUserRegistrationDatabase implements ICredentialsPersistence {
    #mongo_uri: string;
    protected client: MongoClient;
    protected db_name: string;

    constructor(
        db_username: string,
        db_password: string,
        cluster_id: string,
        db_name: string
    ) {
        this.#mongo_uri = `mongodb+srv://${db_username}:${db_password}@${cluster_id}.mongodb.net/?retryWrites=true&w=majority`;
        this.client = this.#createClient(this.#mongo_uri);
        this.db_name = db_name;
    }

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
            await this.client.db(this.db_name).command({ ping: 1 });
        } catch(error) {
            console.log("Failed to ping IUserDatabase <" + this.db_name + ">: " + error);
        }
    }


    public addUser(user: UserRegistration): Promise<void> {
        return new Promise(async (resolve) => {
            try {
                await this.client.connect();
                await this.client
                    .db(this.db_name)
                    .collection("login_info")
                    .insertOne(user);
            } catch {
                console.log("Failed to insert userdata");
            } finally {
                // Ensures that the client will close when you finish/error
                await this.client.close();
                resolve()
            }
        });
    }

    public deleteUser(username: string): Promise<void> {
        return new Promise(async (resolve) => {
            try {
                await this.client.connect();
                await this.client
                    .db(this.db_name)
                    .collection("login_info")
                    .deleteOne({userName: username});
            } catch {
                console.log("Failed to insert userdata");
            } finally {
                // Ensures that the client will close when you finish/error
                await this.client.close();
                resolve()
            }
        });
    }


    public getUser(username: string): Promise<UserRegistration | undefined> {
        return new Promise(async (resolve) => {

            try {
                await this.client.connect();

                let userData = await this.client
                    .db(this.db_name)
                    .collection("login_info")
                    .findOne({userName: username});

                let user: UserRegistration | undefined;
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
                await this.client.close();
            }
        })
    }
}

export class UserTestDB extends MDBUserRegistrationDatabase {
    constructor(
        db_username: string,
        db_password: string,
        cluster_id: string,
        db_name: string
    ) {
        super(db_username, db_password, cluster_id, db_name);
    }

    public async flushLoginInfo() {
        await this.client.connect();
        await this.client.db(this.db_name).collection("login_info").deleteMany({});
        await this.client.close();
    }

}