const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'src', 'views', 'index.html'));
});

app.post('/screenshot', async (req, res) => {
    const { url } = req.body;
    const browser = await puppeteer.launch({
    	args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        await page.setViewport({ width: 1000, height: 800 });

        const element = await page.$('body');
        if (element) {
            const screenshotPath = path.join(__dirname, 'public', 'screenshots', 'screenshot.png');
            await element.screenshot({ path: screenshotPath });
            res.json({ screenshot: '/screenshots/screenshot.png' });
        } else {
            res.status(404).json({ error: 'Element not found' });
        }
    } catch (error) {
	console.log(error)
        res.status(500).json({ error: 'Error capturing screenshot' });
    } finally {
        await browser.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
