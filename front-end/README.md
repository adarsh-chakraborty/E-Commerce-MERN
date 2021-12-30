# Fmazon - The Online Shopping App (Very Original)

## Using Lux Theme from Bootswatch

- Download `bootstrap.min.css` theme file and Put it under `src/`
- Import the css file in Index.css file using `import ./bootstrap.min.css`

## Install React bootstrap library

```
npm i react-bootstrap
```

## Install React Router

```
npm i react-router-dom
```

## Install React Router Bootstrap

It's helpful if we want to wrap React Bootstrap componets with `Link` tag.

```
npm i react-router-bootstrap
```

**Usage:**

Import `LinkContainer` from the package.

```javascript
import { LinkContainer } from 'react-router-bootstrap';
```

Then, we can simply use this container to wrap bootstrap components and provide a `to` prop.
Also, make sure to remove all the `href` props.

```javascript
 <LinkContainer to="/">
    <Navbar.Brand>Fmazon</Navbar.Brand>
</LinkContainer>

<Navbar.Collapse id="basic-navbar-nav">
<Nav className="ms-auto">
    <LinkContainer to="/cart">
    <Nav.Link>
        <i className="fas fa-shopping-cart me-1"></i>Cart
    </Nav.Link>
    </LinkContainer>
    <LinkContainer to="/login">
    <Nav.Link>
        <i className="fas fa-user me-1"></i>Sign In
    </Nav.Link>
    </LinkContainer>
</Nav>
</Navbar.Collapse>
```
