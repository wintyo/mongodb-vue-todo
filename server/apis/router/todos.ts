import Express from 'express';
import TodoModel from '../../models/Todo';

const router = Express.Router();

router.route('/')
  .get((req, res) => {
    TodoModel
      .find()
      .sort({ createdAt: -1 })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .post((req, res) => {
    const { text } = req.body;

    const todo = new TodoModel();
    todo.text = text;
    todo.save((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send('ok');
    });
  });

router.route('/:todoId')
  .delete((req, res) => {
    const { todoId } = req.params;
    TodoModel
      .deleteOne({ _id: todoId })
      .then(() => {
        res.send('ok');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

router.route('/check/:todoId')
  .put((req, res) => {
    const { todoId } = req.params;
    const { isDone } = req.body;

    TodoModel
      .findOne({ _id: todoId })
      .then((todo) => {
        if (todo == null) {
          res.status(400).send(`Todo (id: ${todoId}) not found.`);
          return;
        }
        todo.isDone = isDone;
        todo.save((err) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.send(todo);
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

export default router;
