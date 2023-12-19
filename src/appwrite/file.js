/* eslint-disable no-empty */
import config from '../config'
import { Client, Databases, ID, Storage } from 'appwrite'

export class FileService {
    client = new Client()
    account;

    constructor() {
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getFilePreview({ fileId }) {
        try {
            return await this.bucket.getFilePreview(config.appWriteBucketId, fileId)
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:20 ~ Service ~ getFilePreview ~ error:", error)
            throw error
        }
    }

    async downloadFile({ fileId }) {
        try {
            return await this.bucket.downloadFile(config.appWriteBucketId, fileId)
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:20 ~ Service ~ downloadFile ~ error:", error)
            throw error
        }
    }

    async uploadFile({ file }) {
        try {
            return await this.bucket.createFile(config.appWriteBucketId,
                ID.unique(), file)
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:20 ~ Service ~ uploadFile ~ error:", error)
            throw error
        }
    }

    async updateFile({ file, fileId }) {
        try {
            return await this.bucket.updateFile(config.appWriteBucketId,
                fileId, file)
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:20 ~ Service ~ updateFile ~ error:", error)
            throw error
        }
    }

    async deleteFile({ fileId }) {
        try {
            await this.bucket.deleteFile(config.appWriteBucketId, fileId)
            return true
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:20 ~ Service ~ deleteFile ~ error:", error)
            throw error
        }
    }

}

const fileService = new FileService()

export default fileService