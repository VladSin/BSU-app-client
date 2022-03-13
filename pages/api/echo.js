export default function echo(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.and(JSON.stringify({
        message: req.query.message && 'Successful'
    }))
}