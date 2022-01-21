import React from "react";
import { Link } from "react-router-dom";
import { Header, Footer, Sidebar, Layer } from "../../components";
import "../../helpers/common-style/main-user-page-cards.css";
import AdminElements from "../../components/sidebar/admin-elements/AdminElements";
import { LogoutModal } from "../../components";
import { AdminCardsData } from "../../helpers/users-cards-data/UsersCardsData";

const AdminDashboardUI = ({ handleLogout, profileData }) => {
  const { username } = profileData;

  return (
    <div className="max-width-container d-flex flex-column min-vh-100 position-relative">
      <Header />
      <Sidebar title="ADMIN" children={<AdminElements />} />

      <div className="container-fluid d-flex justify-content-center align-items-center body-container dashboard-page-container">
        <div className="profile-cards-container col col-12 col-lg-10 text-center">
          <h2 className="profile-cards-title">
            WELCOME <span>{username.toUpperCase()}</span>!
          </h2>
          <p className="mb-5">Click on cards to navigate your dashboard.</p>
          <div className="d-flex justify-content-center custom-card-container">
            {AdminCardsData.map((card, i) => {
              return (
                <div className="card custom-card" key={i}>
                  <Link to={card.link} className="text-secondary">
                    <i className={`${card.image} p-4 card-icon fa-2x`} />
                    <div className="card-body">
                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text">{card.description}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
      <LogoutModal handleLogout={handleLogout} />
      <Layer />
    </div>
  );
};

export default AdminDashboardUI;
