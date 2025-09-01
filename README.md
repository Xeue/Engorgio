# grow

Install bunJS

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run 
```

To run as service:

Edit the grow.service file to the correct paths (replace USER with your user account)
Copy it to /etc/systemd/system
Run:
```bash
sudo systemctl enable grow
sudo systemctl start grow
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
