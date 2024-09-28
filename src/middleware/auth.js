{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import jwt from 'jsonwebtoken';\
\
export function authenticateJWT(req, res, next) \{\
  const token = req.headers.authorization?.split(' ')[1];\
  if (!token) \{\
    return res.status(401).json(\{ message: 'Unauthorized' \});\
  \}\
\
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => \{\
    if (err) \{\
      return res.status(403).json(\{ message: 'Forbidden' \});\
    \}\
    req.user = user;\
    next();\
  \});\
\}\
\
export function authorizeAdmin(req, res, next) \{\
  if (req.user.role !== 'admin') \{\
    return res.status(403).json(\{ message: 'Forbidden' \});\
  \}\
  next();\
\}}