export default function getById(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.and(req.query.id)
}