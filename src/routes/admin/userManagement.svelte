<p><script><br>
  let users = [];</p>
<p> async function fetchUsers() {<br>
  const response = await fetch('/api/admin/users');<br>
  users = await response.json();<br>
  }</p>
<p> async function changeRole(userId, newRole) {<br>
  await fetch('/api/admin/changeRole', {<br>
  method: 'POST',<br>
  body: JSON.stringify({ userId, newRole }),<br>
  headers: { 'Content-Type': 'application/json' },<br>
  });<br>
  fetchUsers();  // Refresh the user list<br>
  }</p>
<p> fetchUsers();<br>
  </script></p>
<p><h1>Manage Users</h1><br>
  <table><br>
  <thead><br>
  <tr><br>
  <th>Email</th><br>
  <th>Role</th><br>
  <th>Action</th><br>
  </tr><br>
  </thead><br>
  <tbody><br>
  {#each users as user}<br>
  <tr><br>
  <td>{user.email}</td><br>
  <td>{user.role}</td><br>
  <td><br>
  <select on:change={(e) => changeRole(user.id, e.target.value)}><br>
  <option value="user" selected={user.role === 'user'}>User</option><br>
  <option value="admin" selected={user.role === 'admin'}>Admin</p>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
<p>&lt;script&gt;<br>
  let users = [];</p>
<p> async function fetchUsers() {<br>
  const response = await fetch('/api/admin/users');<br>
  users = await response.json();<br>
  }</p>
<p> async function changeRole(userId, newRole) {<br>
  await fetch('/api/admin/changeRole', {<br>
  method: 'POST',<br>
  body: JSON.stringify({ userId, newRole }),<br>
  headers: { 'Content-Type': 'application/json' },<br>
  });<br>
  fetchUsers();  // Refresh the user list<br>
  }</p>
<p> fetchUsers();<br>
  &lt;/script&gt;</p>
<p>&lt;h1&gt;Manage Users&lt;/h1&gt;<br>
  &lt;table&gt;<br>
  &lt;thead&gt;<br>
  &lt;tr&gt;<br>
  &lt;th&gt;Email&lt;/th&gt;<br>
  &lt;th&gt;Role&lt;/th&gt;<br>
  &lt;th&gt;Action&lt;/th&gt;<br>
  &lt;/tr&gt;<br>
  &lt;/thead&gt;<br>
  &lt;tbody&gt;<br>
  {#each users as user}<br>
  &lt;tr&gt;<br>
  &lt;td&gt;{user.email}&lt;/td&gt;<br>
  &lt;td&gt;{user.role}&lt;/td&gt;<br>
  &lt;td&gt;<br>
  &lt;select on:change={(e) =&gt; changeRole(user.id, e.target.value)}&gt;<br>
  &lt;option value=&quot;user&quot; selected={user.role === 'user'}&gt;User&lt;/option&gt;<br>
  &lt;option value=&quot;admin&quot; selected={user.role === 'admin'}&gt;Admin</p>
</body>
</html>
