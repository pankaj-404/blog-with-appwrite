import config from '../config/config'
import { Client, ID, Account } from 'appwrite'


export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return this.login(email, password)
            } else {
                return
            }
        } catch (error) {
            console.log("🚀 ~ file: auth.js:25 ~ AuthService ~ createAccount ~ error:", error)
            throw error
        }
    }
    async login({ email, password }) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("🚀 ~ file: auth.js:33 ~ AuthService ~ login ~ error:", error)
            throw error
        }
    }
    async getCurrentUser() {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.get()
        } catch (error) {
            console.log("🚀 ~ file: auth.js:41 ~ AuthService ~ getCurrentUser ~ error:", error)
            throw error
        }
    }
    async logout() {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("🚀 ~ file: auth.js:52 ~ AuthService ~ logout ~ error:", error)
            throw error
        }
    }


}

const authService = new AuthService()

export default authService
