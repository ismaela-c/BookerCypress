import booking from '../fixtures/booking.json'
import update from '../fixtures/update.json'

describe('Booker API', () => {

  let token
  let bookingid

  before('Create Token', () => {
    cy.createToken().then((tkn) => {
      token = tkn
    })
  })

  it('Create Booking', ()=>{
    cy.request({
      method: 'POST',
      url: '/booking',
      body: booking
    }).then(({status, body})=>{
      expect(status).to.eq(200)

      bookingid = body.bookingid

      expect(body.booking.firstname).to.eq('Jim')
      expect(body.booking.lastname).to.eq('Brown')
      expect(body.booking.totalprice).to.eq(111)
      expect(body.booking.depositpaid).to.eq(true)
      expect(body.booking.bookingdates.checkin).to.eq('2018-01-01')
      expect(body.booking.bookingdates.checkout).to.eq('2019-01-01')
      expect(body.booking.additionalneeds).to.eq('Breakfast')
    })
  })

  it('Patch Booking', ()=>{
    cy.request({
      method: 'PATCH',
      url: `/booking/${bookingid}`,
      body: update,
      headers: {
        Cookie: `token=${token}`
      }
    }).then(({status, body})=>{
      expect(body.firstname).to.eq('Jim')
      expect(body.lastname).to.eq('Brown')
      expect(body.totalprice).to.eq(111)
      expect(body.depositpaid).to.eq(true)
      expect(body.bookingdates.checkin).to.eq('2018-01-01')
      expect(body.bookingdates.checkout).to.eq('2019-01-01')
      expect(body.additionalneeds).to.eq('Dinner')
    })
  })

  it('DELETE booking', ()=>{
    cy.request({
      method: 'DELETE',
      url: `/booking/${bookingid}`,
      headers: {
        Cookie: `token=${token}`
      }
    }).then(({status})=>{
      expect(status).to.eq(201)
    })
  })

})
