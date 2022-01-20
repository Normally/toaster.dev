const faker = require('faker')

let proxy = {
  number(min, max) {
    return faker.datatype.number({
      min: parseFloat(min),
      max: parseFloat(max) || undefined
    })
  },
  password: faker.internet.password,
  uuid: faker.datatype.uuid,
  boolean: faker.datatype.boolean,
  float(precision = 0.01) {
    return faker.datatype.float({ precision: parseFloat(precision) })
  },
  date(start = 0, end = new Date()) {
    return faker.date.between(start, end)
  },
  random() {
    return faker.random.arrayElement(arguments)
  },
  time(start = 0, end = 1) {
    return new Date(faker.date.between(start, end)).toLocaleTimeString()
  },
  phone(format = 'xxxxx xxxxxx') {
    return format.replace(/(x)/g, function (value) {
      return Math.round(Math.random() * 9)
    })
  },
  lorem(count = 3) {
    return faker.lorem.words(count)
  },
  image() {
    return faker.image.image()
  },
  shortid() {
    return faker.datatype
      .number({ min: 0, max: 1, precision: 0.00000000000000001 })
      .toString(36)
      .substr(2, 16)
  }
}

function fake(str, user) {
  // return the whole user object for a quick shortcut
  if (str === '{user}') {
    return user
  }
  return str.replace(/{(.[^{}]+)}/g, function (value) {
    let matches = arguments[1].match(/(["'])(?:(?=(\\?))\2.)*?\1|([^\s])+/g)
    let split = matches[0].split('.')
    let functionName = split[0]
    let attr = matches.slice(1)

    if (functionName.indexOf('faker') === 0) {
      try {
        return functionName.split('.').reduce((o, i) => o[i], { faker })()
      } catch (error) {
        return '[Error: faker function not found]'
      }
    }
    // convert numbers and strings
    for (a in attr) {
      let isNum = !isNaN(attr[a])
      attr[a] = isNum ? parseFloat(attr[a]) : attr[a]
      if (!isNum) {
        let quoted = attr[a].match(/^["']{1}((?:(?=(\\?))\2.)*?\1+)["']{1}$/m)
        if (quoted) {
          attr[a] = quoted[1]
        }
      }
    }

    if (user[functionName]) {
      return user[functionName]
    } else if (proxy[functionName]) {
      return proxy[functionName].apply(null, attr)
    } else {
      return value
    }
  })
}

function format(obj) {
  let user = faker.helpers.contextualCard()

  let last = faker.name.lastName()

  user = {
    ...user,
    ...user.address,
    name: user.name + ' ' + last,
    firstName: user.name,
    lastName: last,
    title: faker.name.prefix(),
    email: faker.internet.email(user.name, last),
    company: user.company.name,
    domain: faker.internet.domainName(),
    country: faker.address.country(),
    countryCode: faker.address.countryCode(),
    timeZone: faker.address.timeZone(),
    creditCard: faker.finance.creditCardNumber(),
    color: faker.internet.color()
  }

  user.address = `${user.address.suite} ${user.address.street}`
  delete user.phone

  if (obj._repeat) {
    let arr = []
    const { _repeat, ..._clean } = obj
    for (let i = 0; i < obj._repeat; i++) {
      arr.push(format({ ..._clean }))
    }
    obj = arr
  }
  for (var i in obj) {
    if (typeof obj[i] === 'object') {
      obj[i] = format(obj[i])
    } else {
      obj[i] = fake(obj[i], user)
    }
  }
  return obj
}

const handler = (body) => {
  if (!body) {
    return { error: 'No body to play with' }
  }
  // seed
  if (body._seed !== undefined) {
    faker.seed(parseFloat(body._seed))
    delete body._seed
  }
  // locale
  faker.locale = body._locale || 'en'
  delete body._locale

  return format(body)
}

module.exports = handler
