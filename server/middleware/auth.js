import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // Step 1: Get the token from the request
  const token = req.headers.authorization?.split(' ')[1];

  // Step 2: Check whether the token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please login first.'
    });
  }

  // Step 3: Verify the token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Step 4: Store user information in the request
    req.user = user;

    // Step 5: Allow the request to continue
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });

    //Here, the catch block sends the response directly to the client.
    // The error-handling middleware does not run.
    // Why? Because you handled the error locally. You didn't pass it to Express using next(err).
  }
};

export default auth;
