import jwt from 'jsonwebtoken';

const generateAuthToken = ({
  _id,
  username,
}: {
  _id: string;
  username: string;
}) => {
  return jwt.sign(
    {
      username,
      _id: _id.toString(),
    },
    'hienhhccsecret',
    {
      expiresIn: '5h',
    }
  );
};

const tokenService = { generateAuthToken };

export default tokenService;
