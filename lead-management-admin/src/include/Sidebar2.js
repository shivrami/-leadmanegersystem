import React from 'react'

const Sidebar2 = () => {
  return (
    <>
   <div className="custom-template">
    <div className="title">Settings</div>
    <div className="custom-content">
      <div className="switcher">
        <div className="switch-block">
          <h4>Logo Header</h4>
          <div className="btnSwitch">
            <button
              type="button"
              className="selected changeLogoHeaderColor"
              data-color="dark"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="blue"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="purple"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="light-blue"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="green"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="orange"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="red"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="white"
            />
            <br />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="dark2"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="blue2"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="purple2"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="light-blue2"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="green2"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="orange2"
            />
            <button
              type="button"
              className="changeLogoHeaderColor"
              data-color="red2"
            />
          </div>
        </div>
        <div className="switch-block">
          <h4>Navbar Header</h4>
          <div className="btnSwitch">
            <button
              type="button"
              className="changeTopBarColor"
              data-color="dark"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="blue"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="purple"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="light-blue"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="green"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="orange"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="red"
            />
            <button
              type="button"
              className="selected changeTopBarColor"
              data-color="white"
            />
            <br />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="dark2"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="blue2"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="purple2"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="light-blue2"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="green2"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="orange2"
            />
            <button
              type="button"
              className="changeTopBarColor"
              data-color="red2"
            />
          </div>
        </div>
        <div className="switch-block">
          <h4>Sidebar</h4>
          <div className="btnSwitch">
            <button
              type="button"
              className="changeSideBarColor"
              data-color="white"
            />
            <button
              type="button"
              className="selected changeSideBarColor"
              data-color="dark"
            />
            <button
              type="button"
              className="changeSideBarColor"
              data-color="dark2"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="custom-toggle">
      <i className="icon-settings" />
    </div>
  </div>
    </>
  )
}

export default Sidebar2