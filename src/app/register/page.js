'use client';
import { registerUser } from "@/apiManager/api/userApi";
import { registerFailure, registerStart } from "@/store/slices/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    experience: '',
    interests: [],
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false,
  });

  const cityStateMapping = {
    'delhi': 'delhi',
    'mumbai': 'maharashtra',
    'pune': 'maharashtra',
    'bangalore': 'karnataka',
    'chennai': 'tamil-nadu',
    'kolkata': 'west-bengal',
    'hyderabad': 'telangana',
    'ahmedabad': 'gujarat'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if(name === 'interests') {
      setForm(prev => {
        let updated = [...prev.interests];
        if(checked) updated.push(value);
        else updated = updated.filter(i => i !== value);
        return { ...prev, interests: updated };
      });
    } else if(type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if(name === 'city') {
      setForm(prev => ({ ...prev, city: value, state: cityStateMapping[value] || '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.password !== form.confirmPassword) return alert("Passwords don't match!");
    if(!form.terms) return alert("Please accept the Terms of Service and Privacy Policy");
    if(form.interests.length === 0) return alert("Select at least one interest");

    try {
      dispatch(registerStart());
      const data = await registerUser(form);
      dispatch(registerSuccess(data));
      alert("Account created successfully!");
    } catch(err) {
      dispatch(registerFailure(err.message));
      alert(err.message);
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
      {/* Left panel */}
      <section className="hidden lg:flex relative flex-col justify-between p-10 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1200" cy="120" r="300" fill="#10b981"/>
            <circle cx="180" cy="900" r="220" fill="#34d399"/>
            <circle cx="1250" cy="900" r="120" fill="#059669"/>
          </svg>
        </div>
        <header className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500 grid place-items-center font-bold">CC</div>
          <div>
            <h1 className="text-xl font-semibold">Creator Catalyst</h1>
            <p className="text-sm text-gray-300">Google × PING Network</p>
          </div>
        </header>
        <div className="relative z-10">
          <h2 className="text-4xl font-semibold leading-tight">Join thousands of creators
            <span className="text-emerald-300 block">showcasing their cities.</span>
          </h2>
          <ul className="mt-6 space-y-3 text-gray-200">
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span> Create engaging short videos about your city</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span> Participate in exciting challenges and competitions</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span> Learn from industry experts and fellow creators</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span> Earn rewards and build your creator portfolio</li>
          </ul>
        </div>
        <footer className="relative z-10 text-xs text-gray-400">© 2025 PING Network. All rights reserved.</footer>
      </section>

      {/* Right panel */}
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl shadow-gray-200/40 rounded-2xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Create account</h2>
              <p className="mt-1 text-sm text-gray-600">Start your creator journey with Creator Catalyst.</p>
            </div>

            {/* Social */}
            <button className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-gray-300 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition mb-6">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs uppercase tracking-wider text-gray-400">or</span></div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required />
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required />
              </div>
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required />

              {/* Location */}
              <select name="city" value={form.city} onChange={handleChange} className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required>
                <option value="">Select city</option>
                {["delhi","mumbai","bangalore","chennai","kolkata","hyderabad","pune","ahmedabad","other"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="state" value={form.state} onChange={handleChange} className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required>
                <option value="">Select state</option>
                {["delhi","maharashtra","karnataka","tamil-nadu","west-bengal","telangana","gujarat","other"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              {/* Experience */}
              <select name="experience" value={form.experience} onChange={handleChange} className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required>
                <option value="">Select experience</option>
                {["beginner","intermediate","experienced","professional"].map(e => <option key={e} value={e}>{e}</option>)}
              </select>

              {/* Interests */}
              <div className="grid grid-cols-2 gap-2">
                {["food","travel","culture","tech","lifestyle","business"].map(i => (
                  <label key={i} className="flex items-center">
                    <input type="checkbox" name="interests" value={i} checked={form.interests.includes(i)} onChange={handleChange} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"/>
                    <span className="ml-2 text-sm text-gray-700">{i.charAt(0).toUpperCase()+i.slice(1)}</span>
                  </label>
                ))}
              </div>

              {/* Password */}
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" required />

              {/* Terms */}
              <label className="flex items-start gap-3">
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"/>
                <span className="text-sm text-gray-600">I agree to Terms and Privacy</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"/>
                <span className="text-sm text-gray-600">Send me updates</span>
              </label>

              <button type="submit" className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold transition" disabled={loading}>
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
