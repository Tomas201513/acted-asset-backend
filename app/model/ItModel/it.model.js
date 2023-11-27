import mongoose from "mongoose";
import Asset from "../AssetModel/asset.model.js";

const Schema = mongoose.Schema;

const ITSchema = new Schema(
    {
        asset : {
            type: String,
            ref: "Asset",
            required: true,
        }, 
        computerName: {
            type: String,
            required: true,
        },
        serialNumber: {
            type: String,
            required: true,
        },
        windowsVersion: {
            type: String,
            required: true,
        },
        windowsLicenseStatus: {
            type: String,
            enum: ["activated", "not_activated"],
            required: true,
        },
        officeVersion: {
            type: String,
            required: true,
        },
        OfficeLicenseStatus: {
            type: String,
            enum: ["activated", "not_activated"],
            required: true,
        },
        antivirusInstalled: {
            type: String,
            required: true,
        },
        antivirusLicenseStatus: {
            type: String,
            enum: ["activated", "not_activated"],
            required: true,
        },
        
    });

const IT = mongoose.model("IT", ITSchema);

export default IT;

