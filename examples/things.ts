// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  thingsUrl: defaultUrl + ':9000'
})

// Things.js examples.

mySdk.things
  .Create(
    { name: '<thingName>' }, '<token>'
  )
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .GetAll({ offset: 0, limit: 10 }, '<token>')

  .then((response: any) => {
    console.log('response:', response)
  })

  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .Disable({ id: '<thingId>' }, '<token>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.error(error)
  })

mySdk.things
  .Enable({ id: '<thingId>' }, '<token>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.error(error)
  })

mySdk.things
  .Update(
    { id: '<thingId>', name: '<thingName>' }, '<token>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .UpdateThingSecret({ id: '<thingId>', credentials: { secret: 'new_secret' } }, '<token>'
  )
  .then((response: any) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .UpdateThingTags(
    { id: '<thingId>', tags: ['<tag1>', '<tag2>'] },
    '<token>'
  )
  .then((response: any) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ThingsByChannel({ id: '<thingId>' }, { offset: 0, limit: 5 }, '<token>')
  .then((response: any) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .Things({ offset: 0, limit: 10 }, '<token>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .Thing('<thingId>', '<token>')
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ThingsPermissions('<thingId>', '<token>')
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .IdentifyThing('<thingKey>')
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ShareThing(
    '<thingId>',

    '<relation>',
    [
      '<userId1>', '<userId2>'
    ], '<token>')
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .UnShareThing(
    '<thingId>',
    '<relation>',

    [
      '<userId1>', '<userId2>'
    ], '<token>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ListThingUsers(
    '<thingId>',
    { offset: 0, limit: 10 },
    '<token>'
  )
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .DeleteThing({ id: '<thingId>' }, '<token>')
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .CreateThings([{ name: '<thingName>' }, { name: '<thingName>' }], '<token>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })
