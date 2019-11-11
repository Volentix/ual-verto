import {
  Authenticator,
  UALError,
  UALErrorType,
  User
} from 'universal-authenticator-library'

const signatureResponse = {
  wasBroadcast: true,
  transactionId: 'transaction Id'
}

export class User extends User {
  accountName = ''
  chains = []

  constructor(accountName, chains) {
    super()
    this.accountName = accountName
    this.chains = chains
  }

  getKeys() {
    return Promise.resolve([])
  }

  signTransaction(transaction, config) {
    console.info('Requested signature config', config)
    console.info('Requested signature for', transaction)
    return Promise.resolve(signatureResponse)
  }

  getAccountName() {
    return Promise.resolve(this.accountName)
  }

  getChainId() {
    return Promise.resolve(this.chains[0].chainId)
  }

  signArbitrary(publicKey, data, helpText) {
    return new Promise((resolve, reject) => {
      reject(new UALError('Not implemented', UALErrorType.Signing, null, ' User'))
    })
  }

  verifyKeyOwnership(_) {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
}

export class Authenticator extends Authenticator {
  loading = true

  constructor(chains) {
    super(chains)
  }

  getOnboardingLink() {
    return 'https://localhost'
  }

  getStyle() {
    return {
      icon: '',
      textColor: 'white',
      background: 'blue',
      text: ' Auths'
    }
  }

  shouldRender() {
    return true
  }

  shouldAutoLogin() {
    return false
  }
  login(accountName) {
    // alert('Login Authenticator Triggered')
    console.info('Attempted login with ', accountName)

    // Simulate login delay response
    // return new Promise<[User]>((resolve) => {
    //   setTimeout(() => {
    //     resolve([new User(accountName || '', this.chains)])
    //   }, 4000)
    // })
    // return Promise.reject(new UALError('it broke', UALErrorType.Login, null, ' Authenticator'))

    // Login without a delay response
    return Promise.resolve([new User(accountName || '', this.chains)])
  }

  shouldRequestAccountName() {
    return Promise.resolve(true)
  }

  logout() {
    console.info('Logging out')
    return Promise.resolve()
  }

  async init() {
    this.loading = false
  }

  isLoading() {
    return this.loading
  }

  isErrored() {
    return false
  }

  getError() {
    return new UALError('Initialization Error', UALErrorType.Initialization, null, 'this guy')
  }

  reset() {
    console.info('resetting  authenticator')
  }

  requiresGetKeyConfirmation() {
    return false
  }
}