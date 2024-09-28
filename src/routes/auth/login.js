{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import jwt from 'jsonwebtoken';\
import bcrypt from 'bcrypt';\
import db from '../../db';\
import dotenv from 'dotenv';\
dotenv.config();\
\
export async function post(req, res) \{\
  const \{ email, password \} = req.body;\
\
  try \{\
    const userQuery = await db.query('SELECT * FROM users WHERE email = $1', [email]);\
    const user = userQuery.rows[0];\
\
    if (!user) \{\
      return res.status(401).json(\{ message: 'Invalid email or password' \});\
    \}\
\
    // Compare provided password with hashed password in DB\
    const validPassword = await bcrypt.compare(password, user.password);\
    if (!validPassword) \{\
      return res.status(401).json(\{ message: 'Invalid email or password' \});\
    \}\
\
    // Generate JWT\
    const accessToken = jwt.sign(\{ id: user.id, email: user.email, role: user.role \}, process.env.JWT_SECRET, \{\
      expiresIn: '15m',  // Token expires in 15 minutes\
    \});\
\
    const refreshToken = jwt.sign(\{ id: user.id \}, process.env.JWT_REFRESH_SECRET, \{\
      expiresIn: '7d',  // Refresh token expires in 7 days\
    \});\
\
    res.json(\{ accessToken, refreshToken \});\
  \} catch (err) \{\
    res.status(500).json(\{ message: 'Error logging in' \});\
  \}\
\}}