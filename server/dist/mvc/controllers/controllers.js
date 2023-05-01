"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudent = exports.updateTutor = exports.deleteTutor = exports.getTutor = exports.addTutor = exports.getAllTutors = void 0;
const student_1 = __importDefault(require("../models/student"));
const tutor_1 = require("../models/tutor");
function getAllTutors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allTutors = yield tutor_1.Tutor.find({});
            if (!allTutors.length)
                throw new Error();
            res.status(200);
            res.json(allTutors);
        }
        catch (e) {
            res.status(404);
            res.json('could not find tutors');
        }
    });
}
exports.getAllTutors = getAllTutors;
function addTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTutor = yield tutor_1.Tutor.create(req.body);
            res.status(201);
            res.send('OK!');
        }
        catch (e) {
            res.status(400);
            if (e instanceof Error) {
                console.log(e);
                console.log('could not create tutor, remember that your email must be unique');
                res.send('could not create tutor, remember that your email must be unique');
            }
            else {
                console.log('could not create tutor');
                res.send('could not create tutor');
            }
        }
    });
}
exports.addTutor = addTutor;
function getTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tutorId = req.params.id;
        try {
            const foundTutor = yield tutor_1.Tutor.findById(tutorId);
            if (!foundTutor)
                throw new Error();
            res.status(200);
            res.json(foundTutor);
        }
        catch (e) {
            res.status(404);
            res.json(`could not find tutor by id: ${tutorId}`);
        }
    });
}
exports.getTutor = getTutor;
function deleteTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tutorId = req.params.id;
        try {
            const deletedTutor = yield tutor_1.Tutor.findByIdAndDelete(tutorId);
            if (!deletedTutor)
                throw new Error();
            res.status(200);
            res.json(`deleted tutor: ${deletedTutor.name}`);
        }
        catch (e) {
            res.status(404);
            res.json(`could not delete tutor by id: ${tutorId}`);
        }
    });
}
exports.deleteTutor = deleteTutor;
function updateTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tutorId = req.params.id;
        try {
            const updatedTutor = yield tutor_1.Tutor.findByIdAndUpdate(tutorId, req.body);
            if (!updatedTutor)
                throw new Error();
            res.status(200);
            res.json(updatedTutor);
        }
        catch (e) {
            res.status(400);
            res.json(`could not update tutor by id: ${tutorId}`);
        }
    });
}
exports.updateTutor = updateTutor;
function addStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newStudent = yield student_1.default.create(req.body);
            res.status(201);
            res.send('OK!');
        }
        catch (e) {
            res.status(400);
            if (e instanceof Error) {
                console.log(e);
                res.send(e);
            }
            else {
                console.log('Failed to create a student record');
                res.send('Failed to create a student record');
            }
        }
    });
}
exports.addStudent = addStudent;
