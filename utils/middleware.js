import User from '../models/user.model.js'
import { errorLogger } from '../helpers/helper.js'
import jwt from 'jsonwebtoken'

export const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', ''); // Attach the token to the request object
  }
  next()
}

export const userExtractor = async (request, response, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next()
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error, request, response, next) => {
  errorLogger(error.message)
  errorLogger(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ errorType: 'Cast Error', error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ errorType: 'Validate Error', error: error.message })
  } else if (error.name === 'SyntaxError') {
    return response.status(400).json({ errorType: 'Syntax Error', error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ errorType: 'Json Error', error: error.message })
  } else {
    return response.status(500).json({ errorType: 'Unknown Error', error: error.message })
  }

}
