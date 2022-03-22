import { instance } from '../apiConfig';

const PATH = '/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2';

export const questionsApi = {
    getQuestions: () => instance.get(`${PATH}/all`),
    getQuestion: (id: string) => instance.get(`${PATH}/${id}`),
    postQuestion: (question: string) => instance.post(`${PATH}/${question}`),
    updateQuestion: (id: string, question: string) => instance.put(`${PATH}/${id}/${question}`),
    deleteQuestion: (id: string) => instance.delete(`${PATH}/${id}`),
};
