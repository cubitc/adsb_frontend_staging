export const api = {
  auth: {
    login: "v1/auth/login",
    register: "v1/auth/register",
  },
  affiliate: {
    index: "v1/affiliates",
  },
  package: {
    index: "v1/packages",
    infos: "v1/packages/infos",
    purchase_standard: "v1/packages/purchases/standard-package",
    purchase_reseller: "v1/packages/purchases/reseller-package",
    activate_pin: "v1/packages/purchases/pin-activation",
  },
  user: {
    balance: "v1/users/balances",
    is_active: "v1/users/is-active",
  },
  mining: {
    cloud: {
      list: "v1/minings/cloud",
      payouts: "v1/minings/cloud/payouts",
      packages: "v1/minings/cloud/packages",
      purchase3M: "v1/minings/cloud/purchase-3M",
      purchase6M: "v1/minings/cloud/purchase-6M",
      purchase12M: "v1/minings/cloud/purchase-12M",
    },
    physical: {
      infos: "v1/minings/physical/infos",
    },
  },
};
