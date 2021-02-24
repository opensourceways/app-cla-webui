/* eslint-disable no-console */

import { register,unregister } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  unregister()
}

