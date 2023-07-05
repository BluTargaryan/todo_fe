const users = [
  { id: 1, name: 'John', password: 'password1' },
  { id: 2, name: 'Jane', password: 'password2' },
];

let name = '';
let password = '';
let userId = null;

const handleClick = (e) => {
  e.preventDefault();
  const userFound = users.find(
    (user) => user.name === name && user.password === password
  );
  if (userFound) {
    userId = userFound.id;
  } else {
    userId = 0;
  }
  name = '';
  password = '';
};

describe('handleClick', () => {
  beforeEach(() => {
    name = '';
    password = '';
    userId = null;
  });

  test('should set userId to the found user id if user exists', () => {
    name = 'John';
    password = 'password1';

    handleClick(new Event('click'));

    expect(userId).toBe(1);
  });

  test('should set userId to 0 if user does not exist', () => {
    name = 'Invalid';
    password = 'Invalid';

    handleClick(new Event('click'));

    expect(userId).toBe(0);
  });

  test('should clear the name and password fields', () => {
    name = 'John';
    password = 'password1';

    handleClick(new Event('click'));

    expect(name).toBe('');
    expect(password).toBe('');
  });
});