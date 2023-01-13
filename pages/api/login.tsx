import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const KEY = 'jasbdcjkbshsdjihnn326464qb15qwdcjb15'

export default function handler(req: NextApiRequest,res: NextApiResponse) 
{
    console.log(req.body)
    if(!req.body){
      res.statusCode = 404
      res.end('Error')
      return
    }
    const {username,password} = req.body
    res.json({
      token: jwt.sign({
        username,
        admin: username === 'admin' && password === 'admin'
      },KEY)
    })
  }