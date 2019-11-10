export enum AdminView {
    PROFESSOR = 'PROFESSOR',
    STUDENT = 'STUDENT',
    SUBJECT = 'SUBJECT'
}

export const AdminAction = {
    [AdminView.PROFESSOR]: 'Adauga Profesor',
    [AdminView.STUDENT]: 'Adauga Student',
    [AdminView.SUBJECT]: 'Adauga Materie'
};

export const AdminRoute = {
    [AdminView.PROFESSOR]: 'profesori',
    [AdminView.STUDENT]: 'studenti',
    [AdminView.SUBJECT]: 'materii'
};
