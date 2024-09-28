{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import db from '../../../db';\
\
export async function post(req, res) \{\
  const \{ userId, fileId \} = req.body;\
\
  try \{\
    await db.query(`\
      UPDATE purchases\
      SET status = 'Revoked'\
      WHERE user_id = $1 AND file_id = $2\
    `, [userId, fileId]);\
\
    res.status(200).send('Subscription revoked');\
  \} catch (err) \{\
    res.status(500).send('Error revoking subscription');\
  \}\
\}}