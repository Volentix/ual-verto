const {
  Authenticator,
  // ButtonStyle,
  // Chain,
  UALAccountName,
  // UALError,
  UALErrorType,
  UALLoggedInAuthType
  // User,
} = require('universal-authenticator-library')
const CONSTANTS = require('./constants')
// import { ledgerLogo } from './ledgerLogo'
const LedgerUser = require('./volentixUser')
const Name = 'Volentix'

class Volentix extends Authenticator {
  constructor(chains, options) {
    super(chains, options)
    this.chains = chains
    this.onBoardingLink = CONSTANTS.onBoardingLink
    this.users = []
    this.options = options
  }

  isMobile() {
    const userAgent = window.navigator.userAgent
    const isIOS = userAgent.includes('iPhone') || userAgent.includes('iPad')
    const isMobile = userAgent.includes('Mobile')
    const isAndroid = userAgent.includes('Android')
    const isCustom = userAgent.toLowerCase().includes('eoslynx')

    return isIOS || isMobile || isAndroid || isCustom
  }

  async init() {
    console.info('Ledger initialized!')
  }

  /**
   * Ledger will only work with ssl secured websites
   */
  shouldRender() {
    if (window.location.protocol !== 'https:' || this.isMobile()) {
      return false
    }

    return true
  }

  shouldAutoLogin() {
    return false
  }

  async shouldRequestAccountName() {
    return true
  }

  /**
   * Connect to the ledger and request Keys
   *
   * @param accountName Account Name is an optional paramter
   */
  async login(accountName) {
    for (const chain of this.chains) {
      const user = new LedgerUser(chain, accountName, this.requiresGetKeyConfirmation(accountName))
      await user.init()
      const isValid = await user.isAccountValid()
      if (!isValid) {
        const message = `Error logging into account "${accountName}"`
        const type = UALErrorType.Login
        const cause = null
        throw new Error(message, type, cause)
      }
      this.users.push(user)
    }

    return this.users
  }

  async logout() {
    try {
      for (const user of this.users) {
        user.signatureProvider.cleanUp()
        user.signatureProvider.clearCachedKeys()
      }
      this.users = []
    } catch (e) {
      const message = CONSTANTS.logoutMessage
      const type = UALErrorType.Logout
      const cause = e
      throw new Error(message, type, cause)
    }
  }

  getStyle() {
    return {
      // icon: ledgerLogo,
      text: Name,
      textColor: CONSTANTS.white,
      background: CONSTANTS.ledgerGreen,
    }
  }

  isLoading() {
    return false
  }

  isErrored() {
    return false
  }

  getError() {
    return null
  }

  getOnboardingLink() {
    return this.onBoardingLink
  }

  reset() {
    return
  }

  requiresGetKeyConfirmation(accountName) {
    if (!accountName) {
      return true
    }

    const type = window.localStorage.getItem(UALLoggedInAuthType)
    const account = window.localStorage.getItem(UALAccountName)
    if (account === accountName && type === Name) {
      return false
    }

    return true
  }
}
module.exports = Volentix