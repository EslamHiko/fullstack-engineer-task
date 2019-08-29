const fetch = require('node-fetch')
describe('testing graphql', () => {

  // truncating data and importing data from csv before each test
  beforeEach((done)=>{
    fetch('http://localhost:5000/reset')
      .then(res=>{
        done();
      });
  })
  afterAll(done=>{
    fetch('http://localhost:5000/reset')
      .then(res=>{
        done();
      });
  })
  it('Test main endpoint', (done) => {
      fetch('http://localhost:5000/')
        .then((res)=>{
          res.json().then((result)=>{
            const keys = Object.keys(result);
            expect(keys[0]).toBe('candidates');
            const candidates = result.candidates;
            expect(candidates.length).toBe(216);
            expect(candidates[candidates.length-1].email).toBe('michelle.phillips@candidate.com');
            expect(candidates[0].email).toBe('andrew.jordan@candidate.com');
            done();
          })
        });
  });

  test('Test removing candidates', (done) => {
    const uuid = 64 // Top candidate's id
    const query = `mutation {
  RemoveCandidate(uuid:${uuid}){
      ok
  }
  }
  `
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query})
    }).then(
      response => {
        fetch('http://localhost:5000/')
          .then((res)=>{
            res.json().then((result)=>{
              const candidates = result.candidates;
              expect(candidates.length).toBe(215);
              // Second top candidate
              expect(candidates[0].email).toBe('chelsea.lewis@candidate.com');
              done();
            })
          });
      }
    );
  });
  test('Test editing candidates', (done) => {
    const uuid = 64 // Top candidate's id
    let query = `mutation {
  CreateOrUpdateCandidate(uuid:${uuid}, firstName:"Andrew2",
    lastName:"Jordan2",logicTestScore:5,job:"Front-end developer2",email:"andrew.jordan2@candidate.com2")
  {
    candidate{
      uuid,
      email,
      firstName,
      lastName,
      logicTestScore,
      job
    }
  }
}
`
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query})
    }).then(
      response => {
        fetch('http://localhost:5000/')
          .then((res)=>{
            res.json().then((result)=>{
              const candidates = result.candidates;
              const candidate = candidates.filter((cand)=>{
                return cand.uuid == uuid;
              })[0];
              expect(candidates.length).toBe(216);
              expect(candidate.uuid).toBe(uuid);
              expect(candidate.email).toBe("andrew.jordan2@candidate.com2");
              expect(candidate.job).toBe("Front-end developer2");
              expect(candidate.logic_test_score).toBe(5);
              expect(candidate.last_name).toBe("Jordan2");
              expect(candidate.first_name).toBe("Andrew2");
              done();
            })
          });
      }
    );
  });
  test('Test Adding candidates', (done) => {
    let query = `mutation {
  CreateOrUpdateCandidate(firstName:"Andrew2",
    lastName:"Jordan2",logicTestScore:3,job:"Front-end developer2",email:"andrew.jordan2@candidate.com2")
  {
    candidate{
      uuid,
      email,
      firstName,
      lastName,
      logicTestScore,
      job
    }
  }
}
`
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query})
    }).then(
      response => {
        fetch('http://localhost:5000/')
          .then((res)=>{
            res.json().then((result)=>{
              const candidates = result.candidates;
              const candidate = candidates[candidates.length - 1];
              expect(candidates.length).toBe(217);
              expect(candidate.uuid).toBe(217);
              expect(candidate.email).toBe("andrew.jordan2@candidate.com2");
              expect(candidate.job).toBe("Front-end developer2");
              expect(candidate.logic_test_score).toBe(3);
              expect(candidate.last_name).toBe("Jordan2");
              expect(candidate.first_name).toBe("Andrew2");
              done();
            })
          });
      }
    );
  });
});
