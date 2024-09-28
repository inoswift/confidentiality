{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import bcrypt from 'bcrypt';\
import db from '../../db';\
\
export async function post(req, res) \{\
  const \{ email, password, role = 'user' \} = req.body;\
\
  try \{\
    // Check if the email is already registered\
    const existingUserQuery = await db.query('SELECT * FROM users WHERE email = $1', [email]);\
    if (existingUserQuery.rows.length > 0) \{\
      return res.status(400).json(\{ message: 'Email is already registered' \});\
    \}\
\
    // Hash the password before saving it to the database\
    const hashedPassword = await bcrypt.hash(password, 10);\
\
    // Create the new user\
    await db.query(\
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)',\
      [email, hashedPassword, role]\
    );\
\
    res.status(201).json(\{ message: 'User registered successfully' \});\
  \} catch (err) \{\
    res.status(500).json(\{ message: 'Error registering user' \});\
  \}\
\}}