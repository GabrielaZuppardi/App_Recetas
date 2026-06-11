import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../../validators/auth.validators'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import api from '../../../api/api'
import { guardarUsuarioLogueado } from '../../../features/usuarios.slice'
import { FiMail, FiLock } from 'react-icons/fi'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onChange'
  })

  const procesarForm = (data) => {
    console.log(data)
    clearErrors('root')

    api
      .post('/auth/login', data)
      .then((res) => {
        console.log(res.data)
        const usuario = res.data.usuario

        if (usuario.rol === 'usuario') {
          setError('root', {
            type: 'manual',
            message: 'Este acceso es exclusivo para administradores. Ingresá desde el login de usuario.'
          })

          setTimeout(() => {
            navigate('/')
          }, 2000)

          return
        }

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario))

        dispatch(guardarUsuarioLogueado(res.data.usuario))

        navigate('/dashboardAdmin')
      })
      .catch((err) => {
        setError('root', {
          type: 'manual',
          message: err.response?.data?.error || 'Email o contraseña incorrectos'
        })

        console.error('Error al iniciar sesión:', err)
      })
  }

  return (
    <form onSubmit={handleSubmit(procesarForm)} noValidate>
      <div className="form-group">
        <label>Correo electrónico</label>
        <div className="input-wrap">
          <span className="icon">
            <FiMail />{' '}
          </span>
          <input type="email" placeholder="ejemplo@gourmet.com" {...register('email', { onChange: () => clearErrors('root') })} />
        </div>
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <div className="top-row">
          <label>Contraseña</label>
        </div>
        <div className="input-wrap">
          <span className="icon">
            <FiLock />
          </span>
          <input type="password" placeholder="••••••••" {...register('password', { onChange: () => clearErrors('root') })} />
        </div>
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      {errors.root && <span className="error error-general">{errors.root.message}</span>}

      <button type="submit" className="submit-btn" disabled={!isValid || isSubmitting}>
         Ingresar a la plataforma
      </button>
    </form>
  )
}

export default LoginForm
