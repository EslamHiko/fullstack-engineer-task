# Alvalabs Full Stack Software Engineer Task

### Features

  - CRUD Operations (create,update,delete) for Candidates
  - Searchbar
  - Filter Candidates By Their Jobs
  - Importing Candidates from CSV files
  - Exporting Candidates as CSV file
  - Deleting all Candidates from database

### How to run (Server)
  1. Open `/backend` folder
  2. Create environment `python -m venv venv`
  3. Run venv `venv\Scripts\activate` (Windows) or `$ . venv/bin/activate`
  4. Install dependencies `pip install -r requirements.txt`
  5. Run Development Server `python app.py runserver`


### How to run (Frontend)
  1. Open `/frontend` folder
  2. Install dependencies `npm install`
  3. Run development server `npm run start`

### Running Tests
  1. Open `/frontend` folder
  2. Run `npm run test`
##### Test Cases
- Testing main endpoint
- Test removing candidates(graphql)
- Test editing candidates(graphql)
- Test Adding candidates(graphql)
##### Important Notes
- Both backend (`http://localhost:5000/`) and frontend (`http://localhost:5000/`) servers must be running.
- After each test case the database will be truncated and refilled with data from the default csv file ([CSV Example](https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=f25da5866d&attid=0.1&permmsgid=msg-f:1643096589396564915&th=16cd73a47ea35bb3&view=att&disp=inline&saddbat=ANGjdJ-L-5y-Z-ICzylOBtRMvxU0q2X5xwl_ticygd_dEZGqqoR-Z8YvzYNc6V7uh_lWTFU2fvFoMD6gywwPuT-9PRAtX05kiGu-giKA6XcxsHmOAIugzClp7bxCTa5ZktlZ_43HcTsnF-81f-Gng8t4_HVbShSCsYbpklp0kz3BnoG1GOlj-0rYGPozi5RFvOHP6RgT0D8fBSyvyFxBKS2IRQj6B4eERwCRIF4BA4lBQvO2DiXKEfaRSB3F3A39XSFty9NcbAnhfjbGt60DN-dM8jeAZligOlTSeFrWvfooLfXMFq8jh4rHzXbtJuOC_DAZWwlgqO0qDLh2_Jkxym2w2OC1f3e5VaOdLI7MY-QDZf-kROa1F9w1xVICjrrXKjW0T3QPx5vzLxrj-LGxtZW8d-euFA9i4L3HkeQ0Y-fM8q7GPmAKGNg6mE_T650xC2B_S3j5zIR54jPrewxYUVhSsQBjl7egYRnFplkrzGLsGOcuSNAF0z8tT4Ud5Td9FkBDjdoVe1zoqxEcF2SztMQ2ok09-H2-LCcwFVCbxOn-kUh3GhQtvDmOdojymIvVxcfkvg_47-Zrn9u6NsL4Fqr3An0OawnXLXYO9xDxpBJGUaHw2jSb26mZHsziiq3Ukhhq86GuWM31hEC_dW6ANG90hIsG-tu4If83Kq4_CA))
